import {
  ComparatorOperator,
  Model,
  OrderDir,
  SearchFilter,
  SearchRequest
} from "@/app/fixed-models";
import { useEffect, useRef, useState } from "react";
import { TooltipRefProps } from "react-tooltip";
import { Player, Team } from "@/app/models";
import Spinner from "@/app/ui/spinner";
import clsx from "clsx";

export enum FilterSelectModel {
  Team,
  Player
}

interface FilterSelectConfig<T extends Model> {
  model: FilterSelectModel;
  searchUrl: string;
  orderBy: string;
  selector: (t: T) => string;
}

const filterSelectConfigs: FilterSelectConfig<any>[] = [
  {
    model: FilterSelectModel.Team,
    searchUrl: "teams/search",
    orderBy: "city",
    selector: (t: Team) => `${t.city} ${t.name}`
  },
  {
    model: FilterSelectModel.Player,
    searchUrl: "players/search",
    orderBy: "first_name",
    selector: (p: Player) => `${p.first_name} ${p.last_name}`
  }
];

export default function FilterSelect<T extends Model>({
  model,
  onChange,
  disabled,
  defaultId,
  inputWidth,
  filters,
  placeholder
}: {
  model: FilterSelectModel;
  onChange: (id: number) => void;
  disabled?: boolean;
  defaultId?: number;
  inputWidth?: string;
  filters?: SearchFilter[][];
  placeholder?: string;
}) {
  filters ??= [];
  placeholder ??= "Search ...";

  const config = filterSelectConfigs.find((c) => c.model === model);

  if (config == null) return <span></span>;
  //throw new Error(`No config for ${FilterSelectModel} ${model}.`);

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([] as T[]);
  const [selected, setSelected] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const defaultValue =
    defaultId != null ? (data.find((d) => d.id === defaultId) ?? null) : null;

  const tooltip = useRef<TooltipRefProps>({} as TooltipRefProps);

  const request: SearchRequest = {
    order_by: config.orderBy,
    order_dir: OrderDir.Asc,
    filter: filters.concat([
      [
        {
          attribute: "search",
          comparator: { operator: ComparatorOperator.Contains, value: search }
        }
      ]
    ]),
    take: -1
  };

  function search(value: string) {
    setIsLoading(true);

    request.filter = filters!.concat([
      [
        {
          attribute: "search",
          comparator: { operator: ComparatorOperator.Contains, value: value }
        }
      ]
    ]);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/${config!.searchUrl}`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((r) => r.json())
      .then((d: T[]) => {
        setData(d);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    search(searchValue);
  }, []);

  let inputClassName =
    "bg-background border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none ";
  inputClassName += inputWidth ?? "min-w-full";

  let dropdownClassName =
    "absolute z-1 border border-gray-900 shadow-xl shadow-gray-800 bg-background overflow-y-auto h-72 ";
  dropdownClassName += inputWidth ?? "w-full";

  return (
    <div className="relative">
      <input
        className={inputClassName}
        placeholder={placeholder}
        value={
          selected == null
            ? searchValue.length > 0
              ? searchValue
              : defaultValue != null
                ? config.selector(defaultValue)
                : ""
            : config.selector(selected)
        }
        onFocus={() => {
          setSearchValue("");
          search("");
          setSelected(null);
          setShowDropdown(true);
        }}
        onBlur={(evt) => setTimeout(() => setShowDropdown(false), 200)}
        disabled={disabled}
        onChange={(evt) => {
          setSearchValue(evt.target.value);
          search(evt.target.value);
        }}
      ></input>
      <div
        className={clsx(dropdownClassName, {
          "display-none": !showDropdown,
          block: showDropdown
        })}
      >
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          data.map((t, idx) => (
            <a
              onClick={(evt) => {
                setSelected(t);
                onChange(t.id);
                setShowDropdown(false);
                evt.stopPropagation();
              }}
              className="border-b border-gray-700 p-3 hover:bg-secondary block"
            >
              {config.selector(t)}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
