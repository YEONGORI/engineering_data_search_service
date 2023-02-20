package com.sanhak.edss.cad;

import com.sanhak.edss.aspose.AsposeUtils;
import com.sanhak.edss.s3.S3Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
@Component
public class CadServiceImpl implements CadService {

    private final CadRepository cadRepository;
    public final MongoTemplate mongoTemplate;
    private final S3Utils s3Utils;
    private final AsposeUtils asposeUtils;


    public void saveCadFile(String dir) {
        try {
            System.out.println("cadServiceimpl");
            System.out.println(dir);
            String[] mainCategory = dir.split("\"");
            String folder = mainCategory[3];
            String author = mainCategory[7];
            //cadRepository.deleteAll();

            s3Utils.downloadFolder(folder);

            Map<String, String[]> fileInfo = asposeUtils.searchCadFleInDataDir(folder);

            System.out.println("cadServiceimpl222");
            for (Map.Entry<String, String[]> entry: fileInfo.entrySet()) {
                String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                Cad cad = new Cad(author, folder, entry.getValue()[0], entry.getValue()[1], entry.getKey(), entry.getValue()[2], date);

                //cadRepository.save(cad);
                mongoTemplate.insert(cad, "cad");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public List<Cad> searchCadFile(String searchText) {

        try {
            if (searchText.equals(""))
                return null;
            System.out.println(searchText);
            TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
            Sort sort = Sort.by(Sort.Direction.DESC, "score");
            return cadRepository.findAllBy(criteria, sort);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
