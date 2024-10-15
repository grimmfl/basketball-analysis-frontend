import React, {
  cloneElement,
  createElement,
  ReactElement,
  useState
} from "react";
import Modal from "react-modal";
import FilterForm, { Filter, FilterConfig } from "@/app/ui/filter/filter-form";
import { Background } from "@/app/globals";

export interface FilterModalConfig extends FilterConfig {
  onClose: () => void;
  button: ReactElement;
}

const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: Background,
    border: "1px solid rgb(50, 50, 50)"
  }
};

export default function FilterModal({ config }: { config: FilterModalConfig }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([] as Filter[]);

  const actualFilters =
    filters.length === 0 ? (config.defaultFilters ?? []) : filters;

  const innerConfig = {
    ...config,
    onChange: (f: Filter[]) => {
      setFilters(f);
      config.onChange(f);
    },
    defaultFilters: actualFilters
  };

  const children = Array.isArray(config.button.props.children)
    ? config.button.props.children
    : [config.button.props.children];

  const button = cloneElement(config.button, {
    onClick: () => setIsModalOpen(true),
    children: createElement("span", {
      children:
        actualFilters.length === 0
          ? children
          : [
              ...children,
              createElement("div", {
                className:
                  "absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-highlight border-2 border-white rounded-full -top-2 -end-2 border-gray",
                children: actualFilters.length,
                key: 0
              })
            ]
    })
  });

  Modal.setAppElement("#root");
  return (
    <div>
      {button}

      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => {
          setIsModalOpen(false);
          config.onClose();
        }}
        contentLabel="Example Modal"
      >
        <h2 className="text-xl font-bold mb-3">Filter</h2>
        <FilterForm config={innerConfig}></FilterForm>
      </Modal>
    </div>
  );
}
