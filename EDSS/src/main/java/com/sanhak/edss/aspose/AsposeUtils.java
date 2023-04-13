package com.sanhak.edss.aspose;

import com.aspose.cad.Image;
import com.aspose.cad.fileformats.cad.CadImage;
import com.aspose.cad.fileformats.cad.cadconsts.CadEntityTypeName;
import com.aspose.cad.fileformats.cad.cadobjects.CadBaseEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadBlockEntity;
import com.aspose.cad.fileformats.cad.cadobjects.CadMText;
import com.aspose.cad.fileformats.cad.cadobjects.CadText;
import com.aspose.cad.imageoptions.CadRasterizationOptions;
import com.aspose.cad.imageoptions.JpegOptions;
import com.sanhak.edss.s3.S3Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.*;

@RequiredArgsConstructor
@Component
public class AsposeUtils {
    private final S3Utils s3Utils;
    public static final String dataDir = setDataPath() + "s3-download" + File.separator;
    public static final String ImagePath = setDataPath() + "testtest" + File.separator;

    public static String setDataPath() {
        File dir = new File(System.getProperty("user.dir"));
        return dir + File.separator;
    }

    public Map<String, String[]> searchCadFleInDataDir(String dir) {
        System.out.println("searchCadFileInDataDir");
        System.out.println(dir);
        Map<String, String[]> fileInfo = new HashMap<>();
        try {
            System.out.println("searchCadFileInDataDir2222");
            Files.walkFileTree(Paths.get(dataDir + dir), new SimpleFileVisitor<>() {

                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException{
                    System.out.println("visitFile");
                    if (!Files.isDirectory(file) && file.getFileName().toString().contains(".dwg")) {

                        String fileName = file.getFileName().toString();
                        String filePath = file.toAbsolutePath().toString();
                        String fileIndex = extractCadIndex(filePath);
                        System.out.println("complete extract");
                        ByteArrayOutputStream bos = CadToJpeg(filePath);
                        System.out.println("complete cadToJpeg");
                        String S3url = s3Utils.putS3("image/", fileName, bos);
                        System.out.println(S3url);
                        filePath = filePath.substring(filePath.indexOf(dir) + dir.length(), filePath.indexOf(fileName) - 1);
                        System.out.println(filePath);
                        fileInfo.put(fileIndex, new String[]{filePath, fileName, S3url});
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            System.out.println("visitFIle error");
            e.printStackTrace();
        }
        return fileInfo;
    }

    private String extractCadIndex(String cad) {
        try {
            Set<String> index = new HashSet<>();
            CadImage cadImage = (CadImage) CadImage.load(cad);
            for (CadBlockEntity blockEntity : cadImage.getBlockEntities().getValues()) {
                for (CadBaseEntity entity : blockEntity.getEntities()) {
                    if (entity.getTypeName() == CadEntityTypeName.TEXT) {
                        CadText cadText = (CadText) entity;
                        index.add(filterCadIndex(cadText.getDefaultValue()));
                    }
                    else if (entity.getTypeName() == CadEntityTypeName.MTEXT) {
                        CadMText cadMText = (CadMText) entity;
                        index.add(filterCadIndex(cadMText.getText()));
                    }
                }
            }
            return String.join(" | ", index);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    private String filterCadIndex(String index) {
        String filtered = index.replace(" ", "");
        int numCnt = (int) filtered.chars().filter(c -> c >= '0' && c <= '9').count();
        if (numCnt >= filtered.length() / 2)
            return "";
        return filtered;
    }


    public ByteArrayOutputStream CadToJpeg(String filePath) {
        System.out.println("CadToJpeg");

        try {
            Image cadImage = Image.load(filePath);

            CadRasterizationOptions rasterizationOptions = new CadRasterizationOptions();
            rasterizationOptions.setPageHeight(200);
            rasterizationOptions.setPageWidth(200);

            JpegOptions options = new JpegOptions();

            options.setVectorRasterizationOptions(rasterizationOptions);

            ByteArrayOutputStream bos = new ByteArrayOutputStream();

            ExecutorService executor = Executors.newSingleThreadExecutor();
            Callable<ByteArrayOutputStream> task = new Callable<ByteArrayOutputStream>() {
                @Override
                public ByteArrayOutputStream call() throws Exception {
                    cadImage.save(bos, options);
                    System.out.println("success");
                    cadImage.close();
                    return bos;
                }
            };
            Future<ByteArrayOutputStream> future = executor.submit(task);
            executor.shutdown();
            try{
                try{
                    Object result = future.get(10, TimeUnit.SECONDS);
                }catch(TimeoutException e){
                    System.out.println("timeout");
                    cadImage.close();
                    return null;
                }
            }catch(InterruptedException e){
                cadImage.close();
                return null;
            }catch (ExecutionException e){
                cadImage.close();
                return null;
            }

            return bos;
        }catch (Exception e){
            System.out.println("cadtoimage error");
            e.printStackTrace();
            return null;
        }
    }

}
