package com.sanhak.edss.cad;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
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
    @TextIndexed(weight=3)
    private String mainCategory;

    @TextIndexed
    private String subCategory;
    @TextIndexed(weight=4)
    private String title;
    @TextIndexed(weight=2)
    private String index;
    private String s3Url;

    @TextScore
    private float score;
    private String createdAt;


    public Cad(String id, String author, String mainCategory, String subCategory, String title, String index, String s3Url, String createdAt) {
        this.id=id;
        this.author = author;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
        this.title = title;
        this.index = index;
        this.s3Url = s3Url;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Cad File[" +
                "\n\tid=" + id +
                "\n\tmainCategory=" + mainCategory +
                "\n\tsubCategory=" + subCategory +
                "\n\ttitle=" + title +
                "\n\tindex=" + index +
                "\n\ts3Url=" + s3Url +
                "]";
    }


}
