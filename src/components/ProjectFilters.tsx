import React from "react";
import { Search, Filter } from "lucide-react";
import { ColumnVisibilityToggle } from "./ColumnVisibilityToggle";
import { useEntities } from "../context/EntityContext";

const projectStatus = [
  "योजना चरण में",
  "प्रगति पर है",
  "रोक पर",
  "विलंबित",
  "पूर्ण हुआ",
];

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedExecutiveAgency: string;
  onSelectedExecutiveAgency: (value: string) => void;
  columns: { key: string; label: string }[];
  visibleColumns: string[];
  onToggleColumn: (columnKey: string) => void;
}

export const ProjectFilters = ({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  selectedExecutiveAgency,
  onSelectedExecutiveAgency,
  columns,
  visibleColumns,
  onToggleColumn,
}: ProjectFiltersProps) => {
  const { entities, reloadEntities } = useEntities();
  console.warn("These are the entities");

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block outline-none w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            style={{
              width: "12rem",
            }}
            value={selectedDepartment}
            onChange={(e) => {
              onDepartmentChange(e.target.value);
              console.log(e.target.value);
            }}
            className="rounded-md outline-none font-medium border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600"
          >
            <option value="">सभी विभाग</option>
            {entities
              ?.filter((entity) => entity.entity_type === 1)
              .map((entity) => (
                <option key={entity.id} value={entity.entity_name}>
                  {entity.entity_name}
                </option>
              ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-md outline-none font-medium border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600"
          >
            <option value="">परियोजना स्थिति </option>
            {projectStatus.map((status, index) => (
              <option key={status} value={index + 1}>
                {status}
              </option>
            ))}
          </select>

          <select
            style={{
              width: "12rem",
            }}
            value={selectedExecutiveAgency}
            onChange={(e) => onSelectedExecutiveAgency(e.target.value)}
            className="rounded-md className=w-10 outline-none font-medium border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600"
          >
            <option value="">सभी कार्यदायी संस्था</option>
            {entities
              ?.filter((entity) => entity.entity_type === 2)
              .map((entity) => (
                <option key={entity.id} value={entity.entity_name}>
                  {entity.entity_name}
                </option>
              ))}
          </select>

          <ColumnVisibilityToggle
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={onToggleColumn}
          />
        </div>
      </div>
    </div>
  );
};
