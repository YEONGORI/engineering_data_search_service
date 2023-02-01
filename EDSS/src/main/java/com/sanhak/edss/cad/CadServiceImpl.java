package com.sanhak.edss.cad;

import com.sanhak.edss.aspose.AsposeUtils;
import com.sanhak.edss.s3.S3Utils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;



@RequiredArgsConstructor
@Service
public class CadServiceImpl implements CadService {

    private final CadRepository cadRepository;
    private final S3Utils s3Utils;
    private final AsposeUtils asposeUtils;


    public void saveCadFile(String dir) {
        try {
            System.out.println("cadServiceimpl");
            String[] mainCategory = dir.split("\"");
            String folder = mainCategory[3];
            String author = mainCategory[7];
            s3Utils.downloadFolder(folder);

            String existDir = AsposeUtils.dataDir+folder;

            Map<String, String[]> fileInfo = asposeUtils.searchCadFleInDataDir(folder);

            System.out.println("cadServiceimpl222");
            for (Map.Entry<String, String[]> entry: fileInfo.entrySet()) {
<<<<<<< HEAD
                Cad cad = new Cad(mainCategory[3], entry.getValue()[0], entry.getKey(), entry.getValue()[1], entry.getValue()[2]);
=======
                Cad cad = new Cad(author, folder, entry.getValue()[0], entry.getKey(), entry.getValue()[1], entry.getValue()[2]);
>>>>>>> master
                cadRepository.save(cad);
            }
            /*System.out.println("cadserviceimpl333");
            try{
                File file = new File(AsposeUtils.dataDir);
                FileUtils.deleteDirectory(file);
            }catch (IOException e){
                e.printStackTrace();
            }*/



        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void remove(File file) throws IOException {
        System.out.println(file.toString());
        if (file.isDirectory()) {
            removeDirectory(file);
        } else {
            file.delete();
        }
    }
    public void removeDirectory(File directory) throws IOException {
        System.out.println(directory.toString());
        File[] files = directory.listFiles();
        for (File file : files) {
            System.out.println(file.toString());
            file.delete();
        }
        directory.delete();
    }



    public List<Cad> searchCadFile(String searchText) {
        try {
            if (searchText == "")
                return null;
            String[] eachText = searchText.split(" ");
            List<Cad> result = cadRepository.findAllByTitleContains(eachText[0]);
            result = Stream.concat(result.stream(), cadRepository.findAllByIndexContains(eachText[0]).stream()).distinct().toList();
            for (int i=1; i < eachText.length; i++) {
                result = Stream.concat(result.stream(), cadRepository.findAllByTitleContains(eachText[i]).stream()).distinct().toList();
                result = Stream.concat(result.stream(), cadRepository.findAllByIndexContains(eachText[i]).stream()).distinct().toList();
                result = Stream.concat(result.stream(), cadRepository.findAllByMainCategoryContains(eachText[i]).stream()).distinct().toList();
                result = Stream.concat(result.stream(), cadRepository.findAllBySubCategoryContains(eachText[i]).stream()).distinct().toList();

            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
