package com.sanhak.edss.cad;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;

@Data
@Document(collection = "cad")
public class Cad {
    @Id
    private String id;
    private String author;
    private String mainCategory;
    private String subCategory;
    private String title;
    @TextIndexed
    private String index;
    private String s3Url;
    @TextScore
    private Float textScore;

    private String createdAt;


    public Cad(String author, String mainCategory, String subCategory, String title, String index, String s3Url, String createdAt) {
        this.author = author;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
        this.title = title;
        this.index = index;
        this.s3Url = s3Url;
        this.createdAt = createdAt;
    }
}
