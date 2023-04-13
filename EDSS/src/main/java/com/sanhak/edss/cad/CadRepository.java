package com.sanhak.edss.cad;

import org.bson.conversions.Bson;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CadRepository extends MongoRepository<Cad, String> {

    List<Cad> findAllByMainCategoryContains(String searchText);
    List<Cad> findAllBySubCategoryContains(String searchText);

    List<Cad> findAllBy(TextCriteria criteria, Sort sort);
}
