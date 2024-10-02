import { OrderDir, SearchRequest } from "@/app/fixed-models";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function SortIcon({
  prop,
  request,
}: {
  prop: string;
  request: SearchRequest;
}) {
  if (request?.order_by == null || prop !== request.order_by) return "";

  return request.order_dir === OrderDir.Asc ? (
    <ChevronUpIcon className="w-4"></ChevronUpIcon>
  ) : (
    <ChevronDownIcon className="w-4"></ChevronDownIcon>
  );
}
