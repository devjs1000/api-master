import {} from "react";
import { FileAndFolder } from "./file-and-folder";

export const FileAndFolderContext = ({
  elements,
}: IFileAndFolderContextProps) => {
  return (
    <div className="w-full">
      {elements.map((element, index) => (
        <FileAndFolder element={element} key={index} sibling_index={index} />
      ))}
    </div>
  );
};

interface IFileAndFolderContextProps {
  elements: FileAndFoldersType[];
}
