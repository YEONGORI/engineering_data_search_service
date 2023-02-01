package com.sanhak.edss.cad;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CadRepository extends MongoRepository<Cad, String> {
    List<Cad> findAllByTitleContains(String searchText);
    List<Cad> findAllByIndexContains(String searchText);

    List<Cad> findAllByMainCategoryContains(String searchText);
    List<Cad> findAllBySubCategoryContains(String searchText);
}
