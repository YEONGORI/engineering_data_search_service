package com.sanhak.edss.cad;

import java.util.List;

public interface CadService {
    void saveCadFile(String dir);
    List<Cad> searchCadFile(String searchText);
}
