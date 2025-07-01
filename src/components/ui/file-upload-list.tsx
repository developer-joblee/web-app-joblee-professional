import { FileUpload, Float, useFileUploadContext } from '@chakra-ui/react';
import { useEffect } from 'react';
import { LuX } from 'react-icons/lu';

type FileUploadListProps = {
  clearFiles?: boolean;
  onFileRemoved?: () => void;
};

export const FileUploadList = ({
  clearFiles,
  onFileRemoved,
}: FileUploadListProps) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    if (clearFiles) {
      fileUpload.clearFiles();
      onFileRemoved?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearFiles]);

  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup
      display="flex"
      gap="1rem"
      mt={4}
      flexWrap="wrap"
      flexDirection="row"
    >
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};
