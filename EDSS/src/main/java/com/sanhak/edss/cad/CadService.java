package com.sanhak.edss.cad;

import java.util.List;

public interface CadService {
    void saveCadFile(String dir);
    List<Cad> searchCadFile(String searchText);
    void deleteFile(List<String> DelList);
    void modifyFile(String s3Url);
    List<String> ViewStructure(String bucket, String prefix);

}
