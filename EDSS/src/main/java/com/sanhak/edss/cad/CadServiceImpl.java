package com.sanhak.edss.cad;

import com.amazonaws.services.s3.model.ListObjectsRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.sanhak.edss.aspose.AsposeUtils;
import com.sanhak.edss.s3.S3Config;
import com.sanhak.edss.s3.S3Utils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
@Component
public class CadServiceImpl implements CadService {
    @Autowired
    private final CadRepository cadRepository;
    @Autowired
    public final MongoTemplate mongoTemplate;
    private final S3Utils s3Utils;
    private final AsposeUtils asposeUtils;

    private final S3Config s3Config;

    public void saveCadFile(String dir) {
        try {
            System.out.println("cadServiceimpl");
            System.out.println(dir);
            String[] mainCategory = dir.split("\"");
            String folder = mainCategory[3];
            String author = mainCategory[7];
            //cadRepository.deleteAll();

            s3Utils.downloadFolder(folder);

            String existDir = AsposeUtils.dataDir+folder;

            Map<String, String[]> fileInfo = asposeUtils.searchCadFleInDataDir(folder);

            System.out.println("cadServiceimpl222");
            for (Map.Entry<String, String[]> entry: fileInfo.entrySet()) {
                String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                Cad cad = new Cad(entry.getKey(), author, folder, entry.getValue()[0], entry.getValue()[1], entry.getValue()[2], entry.getValue()[3], date);
                cadRepository.save(cad);

            }
            System.out.println("cadserviceimpl333");
            try{
                File file = new File(AsposeUtils.dataDir);
                FileUtils.deleteDirectory(file);
                System.out.println("remove complete");
            }catch (IOException e){
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Cad> searchCadFile(String searchText) {

        try {
            if (searchText == "")
                return null;
            String[] eachText = searchText.split(" ");

            System.out.println(eachText[0]);


            //Query query = TextQuery.queryText(TextCriteria.forDefaultLanguage().notMatching(searchText)).sortByScore();
            //List<Cad> tmp = mongoTemplate.find(query,Cad.class,"cad");
            //System.out.println(tmp.toString());

            //extCriteria criteria = TextCriteria.forDefaultLanguage().matchingPhrase(s)

            /*TextQuery query = new TextQuery(TextCriteria.forDefaultLanguage().matchingPhrase(searchText));
            query.addCriteria(Criteria.where("title").regex(eachText[0]));
            query.sortByScore();
            List<Cad> tmp = mongoTemplate.find(query,Cad.class,"cad");
            for(int i=0;i<tmp.size();i++) {
                System.out.println(tmp.indexOf(0));
            }
            /*Query query = new Query();
            Criteria criteria = new Criteria();
            TextCriteria textCriteria1 = new TextCriteria();
            query.addCriteria(TextCriteria.forDefaultLanguage().matchingPhrase("ASDF"));

            TextCriteria textCriteria = TextCriteria.forDefaultLanguage().matchingPhrase(searchText);
            TextQuery query1 = new TextQuery(textCriteria);
            query1.setScoreFieldName("score");
            query1.sortByScore();*/

            //TextQuery textQuery = new TextQuery();

            /*
            TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                    .onField("title", (float) 4)
                    .onField("mainCategory", (float) 3)
                    .onField("index", (float) 2)
                    .onField("subCategory")
                    .build();
            mongoTemplate.indexOps(Cad.class).ensureIndex(textIndex);
            */


            //TextQuery textQuery = TextQuery.queryText(new TextCriteria().matchingAny(eachText[0])).sortByScore();
            //List<Cad> tmp = mongoTemplate.find(textQuery,Cad.class,"cad");
            /*for(int i=1;i<eachText.length;i++){
                TextQuery tmpQuery = TextQuery.queryText(new TextCriteria().matchingAny(eachText[i])).sortByScore();
                tmp = Stream.concat(tmp.stream(),mongoTemplate.find(tmpQuery,Cad.class,"cad").stream()).distinct().toList();

            }*/



            String Col[] = {"title", "mainCategory" ,"subCategory", "index"};
            /*Query query_qrr[][] = new Query[Col.length][eachText.length];

            for(int i=0;i<Col.length;i++){
                for(int j=0;j<eachText.length;j++){
                    query_qrr[i][j] = new Query();
                    query_qrr[i][j].addCriteria(Criteria.where(Col[i]).regex(eachText[j]));
                }

            }
            List<Cad> list = mongoTemplate.find(query_qrr[0][0],Cad.class,"cad");
            for(int i=0;i<eachText.length;i++){
                list = Stream.concat(list.stream(),mongoTemplate.find(query_qrr[0][i],Cad.class,"cad").stream()).distinct().toList();
                list = Stream.concat(list.stream(),mongoTemplate.find(query_qrr[1][i],Cad.class,"cad").stream()).distinct().toList();
                list = Stream.concat(list.stream(),mongoTemplate.find(query_qrr[2][i],Cad.class,"cad").stream()).distinct().toList();
                list = Stream.concat(list.stream(),mongoTemplate.find(query_qrr[3][i],Cad.class,"cad").stream()).distinct().toList();
            }
            /*TextIndexDefinition textindex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                    .onField("title", (float)4)
                    .onField("mainCategory", (float)3)
                    .onField("index", (float)2)
                    .onField("subCategory", (float)1)
                    .build();
*/
            Sort sort = Sort.by(Sort.Direction.DESC,"score");
            TextCriteria criteria = TextCriteria.forDefaultLanguage().matchingAny("/%"+searchText+"/%");
            //TextQuery textQuery = new TextQuery(criteria);
            //textQuery.sortByScore();
            List<Cad> result = cadRepository.findAllBy(criteria, sort);
            //List<Cad> result = cadRepository.findAllByTitleOrIndexOrMainCategoryOrSubCategoryContains(eachText[0], eachText[0], eachText[0], eachText[0]);
            System.out.println(searchText);
            System.out.println(result.toString());
            /*for (int i=1; i < eachText.length; i++) {
                /*Stream.concat(result.stream(), cadRepository.findAllByTitleContains(eachText[i]).stream()).distinct().toList();
                Stream.concat(result.stream(), cadRepository.findAllByIndexContains(eachText[i]).stream()).distinct().toList();
                Stream.concat(result.stream(), cadRepository.findAllByMainCategoryContains(eachText[i]).stream()).distinct().toList();
                Stream.concat(result.stream(), cadRepository.findAllBySubCategoryContains(eachText[i]).stream()).distinct().toList();

                Stream.concat(result.stream(), cadRepository.findAllBySubCategoryOrTitleOrIndexOrMainCategoryContains(eachText[i]).stream()).distinct().toList();

            }*/
            //return list;
            return result;
            //return tmp;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteFile(List<String> DelList){

        for(String component:DelList){
            JSONObject jsonObject = new JSONObject(component);

            String id = (String) jsonObject.get("id");
            String mainCategory = (String) jsonObject.get("mainCategory");
            String subCategory = (String) jsonObject.get("subCategory");
            String title = (String) jsonObject.get("title");
            String url = (String) jsonObject.get("url");

            String FilePath = mainCategory+subCategory+title;
            cadRepository.deleteById(id);//delete mongoDB data
            s3Utils.deleteS3File(FilePath);//delete aws cad File
            s3Utils.deleteS3File(url);//delete aws image File
        }
    }

    public void modifyFile(String s3Url){
        //다운로드 후 추출 후 몽고디비 저장, 파일 삭제, 기존파일 삭제

    }

    public List<String> ViewStructure(String bucket, String prefix) {
        List<String> fileNames = new ArrayList<>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(bucket);
        if (!prefix.equals("")) {
            listObjectsRequest.setPrefix(prefix + "/");
        }
        listObjectsRequest.setDelimiter("/");
        ObjectListing s3Objects;
        String fileName;
        do {
            s3Objects = s3Config.amazonS3().listObjects(listObjectsRequest);
            for (String commonPrefix : s3Objects.getCommonPrefixes()) {
                if (!prefix.equals("")) {
                    String[] split = commonPrefix.split("/");
                    fileName = split[split.length-1]+"/";
                } else {
                    fileName = commonPrefix;
                }
                fileNames.add(fileName);
            }

            for (S3ObjectSummary objectSummary : s3Objects.getObjectSummaries()) {
                fileNames.add(objectSummary.getKey());
            }
            listObjectsRequest.setMarker(s3Objects.getNextMarker());
        } while (s3Objects.isTruncated());
        return fileNames;
    }
}