import React from "react";
import { X } from "lucide-react";
import { useEntities } from "../../context/EntityContext";

const projectStatus = [
  "योजना चरण में",
  "प्रगति पर है",
  "रोक पर",
  "विलंबित",
  "पूर्ण हुआ",
];

interface ProjectFilterPanelProps {
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedExecutiveAgency: string;
  onExecutiveAgencyChange: (value: string) => void;
  onClose: () => void;
  onReset: () => void;
  user: any;
}

export default function ProjectFilterPanel({
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  selectedExecutiveAgency,
  onExecutiveAgencyChange,
  onClose,
  onReset,
  user,
}: ProjectFilterPanelProps) {
  const { entities } = useEntities();

  return (
    <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Filters</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            विभाग चुनें
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 border p-2"
          >
            {user?.userRole === 1 ? (
              <>
                <option value="">सभी विभाग</option>
                {entities
                  ?.filter((entity) => entity.entity_type === 1)
                  .map((entity) => (
                    <option key={entity.id} value={entity.entity_name}>
                      {entity.entity_name}
                    </option>
                  ))}
              </>
            ) : (
              <option value={user?.entityName}>{user?.entityName}</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            परियोजना स्थिति
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 border p-2"
          >
            <option value="">सभी स्थिति</option>
            {projectStatus.map((status, index) => (
              <option key={status} value={index + 1}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            कार्यदायी संस्था
          </label>
          <select
            value={selectedExecutiveAgency}
            onChange={(e) => onExecutiveAgencyChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 border p-2"
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
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
