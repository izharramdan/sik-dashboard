"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { apiGet } from "@/lib/api";

type Option = {
  id: string;
  code?: string;
  name: string;
};

export type DashboardFilters = {
  divisionId?: string;
  departmentId?: string;
  sectionId?: string;
};

type Props = {
  value: DashboardFilters;
  onChange: (value: DashboardFilters) => void;
};

export function FilterBar({ value, onChange }: Props) {
  const [divisions, setDivisions] = useState<Option[]>([]);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [sections, setSections] = useState<Option[]>([]);

  const { divisionId, departmentId, sectionId } = value;

  // Load divisions first time
  useEffect(() => {
    apiGet("/filters/divisions")
      .then(setDivisions)
      .catch((err) => {
        console.error("Failed to load divisions", err);
      });
  }, []);

  // When division changes → load departments
  useEffect(() => {
    if (!divisionId) {
      setDepartments([]);
      onChange({ divisionId: undefined, departmentId: undefined, sectionId: undefined });
      return;
    }

    apiGet(`/filters/departments?divisionId=${divisionId}`)
      .then(setDepartments)
      .catch((err) => console.error("Failed to load departments", err));

    // reset child filters
    onChange({ divisionId, departmentId: undefined, sectionId: undefined });
    setSections([]);
  }, [divisionId]);

  // When department changes → load sections
  useEffect(() => {
    if (!departmentId) {
      setSections([]);
      onChange({ divisionId, departmentId: undefined, sectionId: undefined });
      return;
    }

    apiGet(`/filters/sections?departmentId=${departmentId}`)
      .then(setSections)
      .catch((err) => console.error("Failed to load sections", err));

    onChange({ divisionId, departmentId, sectionId: undefined });
  }, [departmentId]);

  // Local handler when section changes
  const handleSectionChange = (val?: string) => {
    onChange({ divisionId, departmentId, sectionId: val });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* Division */}
      <Select
        value={divisionId}
        onValueChange={(val) => onChange({ divisionId: val, departmentId: undefined, sectionId: undefined })}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select Division" />
        </SelectTrigger>
        <SelectContent>
          {divisions.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.code ? `${d.code} - ${d.name}` : d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Department */}
      <Select
        value={departmentId}
        onValueChange={(val) => onChange({ divisionId, departmentId: val, sectionId: undefined })}
        disabled={!divisionId}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.code ? `${d.code} - ${d.name}` : d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Section */}
      <Select
        value={sectionId}
        onValueChange={handleSectionChange}
        disabled={!departmentId}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent>
          {sections.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.code ? `${s.code} - ${s.name}` : s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
