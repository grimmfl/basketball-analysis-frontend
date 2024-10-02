import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, {useState} from "react";
import {ComparatorOperator, SearchComparator} from "@/app/fixed-models";
import {getProperty, removeDuplicates, zip} from "@/app/utils";
import {Translations} from "@/app/translations";
import FilterSelect, {FilterSelectModel} from "@/app/ui/filter/filter-select";

export interface FilterConfig {
    onChange: (filters: Filter[]) => void;
    tableName: string;
    defaultFilters?: Filter[];
}

export interface Filter {
    name: string;
    key: string;
    comparator: SearchComparator;
}

interface FilterGroup {
    name: string;
    key: string;
    filters: Filter[];
}


function resolveFilters(properties: string[], translations: any, prefix: string = "", skipPrefix: number = 0): FilterGroup[] {
    const group: FilterGroup = {
        name: getProperty(translations, "__name__"),
        filters: [],
        key: prefix
    };

    let groups: FilterGroup[] = [group];

    for (const property of properties) {
        const value = getProperty(translations, property)

        if (typeof value === "string") {
            group.filters.push({
                key: prefix + property,
                name: value,
                comparator: {operator: ComparatorOperator.Equal, value: 0}
            });
        } else {
            let newPrefix = prefix;
            if (skipPrefix <= 0)
                newPrefix += property + "."

            if (value == null) continue;

            const subProperties = Object.getOwnPropertyNames(value).filter(p => p != "__name__");
            groups = groups.concat(resolveFilters(subProperties, value, newPrefix, skipPrefix - 1))
        }
    }

    return removeDuplicates(groups
            .filter(g => g.filters.length > 0)
            .sort((a, b) => a.key.length - b.key.length),
        i => i.name);
}

function resolveTableFilters(table: string) {
    return resolveFilters([table], Translations, "", 1);
}

function getOperators() {
    const valueMembers = [];
    const nonValueMembers = [];

    for (let member in ComparatorOperator) {
        if (Number(member) >= 0) valueMembers.push(member);
        else nonValueMembers.push(member);
    }

    return zip(nonValueMembers, valueMembers).map(v => ({name: v.item1, value: v.item2}));
}

function getFilterSelectModel(filter: Filter): FilterSelectModel | null {
    if (!filter.key.endsWith(".id")) return null;

    const splitted = filter.key.split(".");

    const name = splitted.at(-2);

    switch (name) {
        case "team":
            return FilterSelectModel.Team;
        default:
            return null;
    }

}

export default function FilterForm({config}: { config: FilterConfig }) {
    const availableFilters = resolveTableFilters(config.tableName);
    const filterOperators = getOperators();

    const defaultFilters = config.defaultFilters ?? [];
    const defaultGroups = availableFilters.filter(g => g.filters.some(f => defaultFilters.some(df => f.key === df.key)));

    defaultGroups.forEach(g => g.filters.forEach(f => {
        const defaultFilter = defaultFilters.find(df => df.key === f.key);

        if (defaultFilter == null) return;

        f.comparator = defaultFilter.comparator;
    }))

    const [filters, setFilters] = useState(defaultFilters);
    const [visibleGroups, setVisibleGroups] = useState(defaultGroups);

    function filterIsActive(filter: Filter) {
        return filters.find(f => f.key === filter.key) != null;
    }

    function toggleFilter(filter: Filter) {
        let newFilters;

        if (filterIsActive(filter)) {
            newFilters = filters.filter(f => f.key !== filter.key);
        } else {
            newFilters = filters.concat([filter]);
        }

        update(newFilters);
    }

    function setFilterOperator(filter: Filter, value: string) {
        let newFilters = filters.filter(f => f.key !== filter.key);
        let thisFilter = filters.find(f => f.key === filter.key)!;
        newFilters.push({...thisFilter, comparator: {...thisFilter.comparator, operator: Number(value)}});
        update(newFilters);
    }

    function setFilterValue(filter: Filter, value: string) {
        let newFilters = filters.filter(f => f.key !== filter.key);
        let thisFilter = filters.find(f => f.key === filter.key)!;
        newFilters.push({...thisFilter, comparator: {...thisFilter.comparator, value: value}})
        update(newFilters);
    }

    function toggleFilterGroup(group: FilterGroup) {
        const groupIdx = visibleGroups.findIndex(g => g.name === group.name);

        if (groupIdx === -1) {
            setVisibleGroups(visibleGroups.concat([group]));
        } else {
            setVisibleGroups(visibleGroups.filter((g, idx) => idx !== groupIdx));
        }
    }

    function update(filters: Filter[]) {
        setFilters(filters);
        config.onChange(filters);
    }

    return (
        <table>
            <tbody>
            {availableFilters.map(g =>
                visibleGroups.some(vg => vg.name === g.name) ?
                    [<tr className="hover:cursor-pointer" onClick={() => toggleFilterGroup(g)}>
                        <td className="pt-5"><ChevronUpIcon className="w-4 mr-2"></ChevronUpIcon></td>
                        <td className="pt-5">{g.name}</td>
                    </tr>].concat(g.filters.map(f =>
                        f.key.includes("id")
                            ? <tr key={g.name + f.key} className={clsx({
                                "text-gray-500": !filterIsActive(f)
                            })}>
                                <td><input type="checkbox" checked={filterIsActive(f)}
                                           onClick={() => toggleFilter(f)}
                                           className="mr-2"></input></td>
                                <td>{f.name}</td>
                                <td>{getFilterSelectModel(f) != null ? <FilterSelect disabled={!filterIsActive(f)} model={getFilterSelectModel(f)!} onChange={(id) => setFilterValue(f, id.toString())} defaultId={parseInt(f.comparator.value, 10)}></FilterSelect> : <span className="m-3">Not Available</span>}</td>
                            </tr>
                            : <tr key={g.name + f.key} className={clsx({
                                "text-gray-500": !filterIsActive(f)
                            })}>
                            <td><input type="checkbox" checked={filterIsActive(f)}
                                           onClick={() => toggleFilter(f)}
                                           className="mr-2"></input></td>
                                <td className="min-w-32">{f.name}</td>
                                <td>
                                    <select disabled={!filterIsActive(f)}
                                            className="webkit-none bg-black rounded-none border-b border-b-gray-700 p-3 w-40"
                                            onChange={(evt) => setFilterOperator(f, evt.target.value)}
                                            defaultValue={f.comparator.operator}>
                                        {filterOperators.map(o =>
                                            <option value={o.value}>{o.name}</option>
                                        )}
                                    </select>
                                </td>
                                <td>
                                    <input disabled={!filterIsActive(f)}
                                           className="bg-black border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none w-40 ml-10"
                                           value={f.comparator.value}
                                           onChange={evt => setFilterValue(f, evt.target.value)}></input>
                                </td>
                            </tr>
                    )) : <tr className="hover:cursor-pointer" onClick={() => toggleFilterGroup(g)}>
                        <td className="pt-5"><ChevronDownIcon className="w-4 mr-2"></ChevronDownIcon></td>
                        <td className="pt-5">{g.name}</td>
                    </tr>
            )}
            </tbody>
        </table>
    )
}