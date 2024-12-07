interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  children: (ApiFolder | ApiFile)[] | null;
}

interface ProjectAdd {
  name: string;
  description: string;
  tags: string[];
}

interface ProjectUpdate {
  name: string;
  description: string;
  tags: string[];
}
type Path = `${number}.${number}` | `${number}` | "";

interface FolderAdd {
  name: string;
  path: Path;
  description: string;
  tags: string[];
}

interface FolderUpdate {
  name: string;
  path?: Path;
  description?: string;
  tags?: string[];
}

interface FileAdd {
  name: string;
  path: Path;
  method: MethodType;
  url: URLType;
  description: string;
  tags: string[];
}

interface FileUpdate {
  name: string;
  path?: Path;
  method?: MethodType;
  url?: URLType;
  description?: string;
  tags?: string[];
}

interface ApiFolder {
  id: string;
  type: "folder";
  name: string;
  description: string;
  tags: string[];
  children: (ApiFolder | ApiFile)[];
  version: string;
  created_at: Date;
  updated_at: Date;
}

type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ProtocolsType = "http" | "https";
type URLType = `${ProtocolsType}://${string}`;

interface ApiFile {
  id: string;
  type: "file";
  method: MethodType;
  url: URLType;
  name: string;
  description: string;
  tags: string[];
  params: { [key: string]: any };
  responses: ApiResponse[];
  version: string;
  created_at: Date;
  updated_at: Date;
}

interface ApiResponse {
  id: string;
  type: "response";
  response: string;
  status: number;
  headers: { [key: string]: any };
  params: { [key: string]: any };
}

type ParamSchemaType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "null"
  | "any";

interface ParamSchema {
  _type: ParamSchemaType;
  _required: boolean;
  _default: any;
  //object specific
  _node?: {
    [key: string]: ParamSchema;
  };
  //number specific
  _min?: number;
  _max?: number;
  //string specific
  _min_length?: number;
  _max_length?: number;
  _pattern?: string;
  _enum?: string[];
  //array specific
  _items?: ParamSchema;
  _min_items?: number;
  _max_items?: number;
  _unique_items?: boolean;
}

type FileAndFoldersType = ApiFolder | ApiFile;
