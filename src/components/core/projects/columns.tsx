import { ColumnDef } from "@tanstack/react-table";
import {
  CopyIcon,
  EditIcon,
  LinkIcon,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { TextWrap } from "@/components/custom";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => params.on_copy(project.id)}>
                <CopyIcon />
                <TextWrap>Copy project ID</TextWrap>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => params.on_open(project.id)}>
                <LinkIcon />
                <TextWrap>Open project</TextWrap>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => params.on_edit(project.id)}>
                <EditIcon />
                <TextWrap>Edit Project</TextWrap>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                color="red"
                onClick={() => params.on_delete(project.id)}
              >
                <TrashIcon />
                <TextWrap>Delete</TextWrap>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
