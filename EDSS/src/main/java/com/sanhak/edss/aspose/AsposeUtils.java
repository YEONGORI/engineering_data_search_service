package com.sanhak.edss.aspose;

import com.aspose.cad.fileformats.cad.CadImage;
import com.aspose.cad.fileformats.cad.cadconsts.CadEntityTypeName;
import com.aspose.cad.fileformats.cad.cadobjects.CadBaseEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadBlockEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadMText;
import com.aspose.cad.fileformats.cad.cadobjects.CadText;
import org.springframework.stereotype.Component;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.HashMap;
import java.util.Map;

@Component
public class AsposeUtils {
    private static final String dataDir = setDataPath();

    public static String setDataPath() {
        File dir = new File(System.getProperty("user.dir"));
//        dir = new File(dir, "EDSS");//temp
        dir = new File(dir, "s3-download");
        return dir + File.separator;
    }

    public Map<String, String[]> searchCadFleInDataDir(String dir) {
        Map<String, String[]> fileInfo = new HashMap<>();
        try {
            Files.walkFileTree(Paths.get(dataDir + dir), new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    if (!Files.isDirectory(file) && file.getFileName().toString().contains(".dwg")) {
                        String fileName = file.getFileName().toString();
                        String filePath = file.toAbsolutePath().toString();
                        String fileIndex = extractTextInCadFile(filePath);
                        filePath = filePath.substring(filePath.indexOf(dir), filePath.indexOf(fileName));
                        fileInfo.put(fileName, new String[]{filePath, fileIndex});
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileInfo;
    }

    public static String extractTextInCadFile(String fileName) {
        String index = "";

        // Load an existing DWG file as CadImage.
        CadImage cadImage = (CadImage) CadImage.load(fileName);

        // Search for text in the block section
        for (CadBlockEntity blockEntity : cadImage.getBlockEntities().getValues()) {
            for (CadBaseEntity entity : blockEntity.getEntities()) {
                if (entity.getTypeName() == CadEntityTypeName.TEXT) {
                    CadText childObjectText = (CadText)entity;
                    index = index + childObjectText.getDefaultValue() + "| ";
                }

                else if (entity.getTypeName() == CadEntityTypeName.MTEXT) {
                    CadMText childObjectText = (CadMText)entity;
                    index += childObjectText.getText();
                    index += "| ";
                }

            }
        }
        return index;
    }

}
