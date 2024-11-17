import { ColumnDef } from "@tanstack/react-table";
import {
  CopyIcon,
  EditIcon,
  LinkIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CustomDropdown } from "@/components/custom-shad";

export const create_columns = (params: CreateColumnsParams) => {
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return value.length > 50 ? `${value.slice(0, 50)}...` : value;
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ getValue }) => {
        const value = getValue() as string[];
        return (
          <div className="flex space-x-2">
            {value.map((tag, i) => (
              <Badge key={`${tag}-${i}`} variant={"secondary"}>
                {tag}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => {
        const value = getValue() as Date;
        return formatDistance(value, new Date(), { addSuffix: true });
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ getValue }) => {
        const value = getValue() as Date;
        return formatDistance(value, new Date(), { addSuffix: true });
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <CustomDropdown
            items={[
              {
                name: "copy",
                label: "Copy project ID",
                Icon: CopyIcon,
                on_click: () => params.on_copy(project.id),
              },
              {
                name: "open",
                label: "Open project",
                Icon: LinkIcon,
                on_click: () => params.on_open(project.id),
              },
              {
                name: "edit",
                label: "Edit Project",
                Icon: EditIcon,
                on_click: () => params.on_edit(project.id),
              },
              {
                name: "delete",
                label: "Delete",
                Icon: TrashIcon,
                on_click: () => params.on_delete(project.id),
              },
            ]}
            menu={{ label: "Actions" }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </CustomDropdown>
        );
      },
    },
  ];
  return columns;
};

interface CreateColumnsParams {
  on_delete: (project_id: string) => void;
  on_copy: (project_id: string) => void;
  on_open: (project_id: string) => void;
  on_edit: (project_id: string) => void;
}
