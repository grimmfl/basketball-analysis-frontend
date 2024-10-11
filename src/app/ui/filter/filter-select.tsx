import {
  ComparatorOperator,
  Model,
  OrderDir,
  SearchRequest
} from "@/app/fixed-models";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipRefProps } from "react-tooltip";
import { Team } from "@/app/models";
import Spinner from "@/app/ui/spinner";
import clsx from "clsx";

export enum FilterSelectModel {
  Team
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
  }
];

export default function FilterSelect<T extends Model>({
  model,
  onChange,
  disabled,
  defaultId,
  inputWidth
}: {
  model: FilterSelectModel;
  onChange: (id: number) => void;
  disabled?: boolean;
  defaultId?: number;
  inputWidth?: string;
}) {
  const config = filterSelectConfigs.find((c) => c.model === model);

  if (config == null) return <span></span>;
  //throw new Error(`No config for ${FilterSelectModel} ${model}.`);

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([] as T[]);
  const [selected, setSelected] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValue =
    defaultId != null ? (data.find((d) => d.id === defaultId) ?? null) : null;

  const tooltip = useRef<TooltipRefProps>({} as TooltipRefProps);

  const request: SearchRequest = {
    order_by: config.orderBy,
    order_dir: OrderDir.Asc,
    filter: [
      [
        {
          attribute: "search",
          comparator: { operator: ComparatorOperator.Contains, value: search }
        }
      ]
    ],
    take: -1
  };

  function search(value: string) {
    setIsLoading(true);

    request.filter = [
      [
        {
          attribute: "search",
          comparator: { operator: ComparatorOperator.Contains, value: value }
        }
      ]
    ];

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
    "bg-black border-b border-b-gray-700 p-3 focus:placeholder:text-transparent focus:outline-none ";
  inputClassName += inputWidth ?? "min-w-full";

  return (
    <div>
      <input
        data-tooltip-id="tooltip"
        className={inputClassName}
        placeholder="Search ..."
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
        }}
        disabled={disabled}
        onChange={(evt) => {
          setSearchValue(evt.target.value);
          search(evt.target.value);
        }}
      ></input>
      <Tooltip
        openEvents={{ focus: true, mouseover: false }}
        closeEvents={{ blur: true, mouseout: false }}
        id="tooltip"
        place="bottom"
        clickable
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          padding: 0
        }}
        border="1px solid gray"
        noArrow={true}
        ref={tooltip}
      >
        <div className="flex-col h-72 overflow-y-auto bg-black">
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            data.map((t, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    setSelected(t);
                    onChange(t.id);
                    tooltip.current?.close();
                  }}
                  className="border-b border-gray-700 p-3 min-w-full hover:bg-gray-900"
                >
                  {config.selector(t)}
                </button>
              </div>
            ))
          )}
        </div>
      </Tooltip>
    </div>
  );
}
