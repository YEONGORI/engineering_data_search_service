package com.sanhak.edss.cad;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CadRepository extends MongoRepository<Cad, String> {
    List<Cad> findAllBy(TextCriteria text, Sort sort);
}