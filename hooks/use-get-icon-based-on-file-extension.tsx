import { getFileExtension } from "@/lib/utils";
import { FileMusic, LucideFileVideo } from "lucide-react";
import {
  AiFillFile,
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFileText,
  AiFillFileWord,
  AiFillFileZip,
} from "react-icons/ai";

export default function useGetIconBasedOnFileExtension(filename: string) {
  const extension = getFileExtension(filename);

  switch (extension) {
    case "txt":
      return AiFillFileText;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return AiFillFileImage;
    case "mp3":
      return FileMusic;
    case "mp4":
      return LucideFileVideo;
    case "pdf":
      return AiFillFilePdf;
    case "zip":
      return AiFillFileZip;
    case "doc":
    case "docm":
    case "docx":
    case "dot":
      return AiFillFileWord;
    case "xla":
    case "xlam":
    case "xll":
    case "xlm":
    case "xls":
    case "xlsm":
      return AiFillFileExcel;
    default:
      return AiFillFile;
  }
}
