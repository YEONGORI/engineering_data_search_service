package com.sanhak.edss.cad;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String index;
<<<<<<< HEAD

    private String imageURL;
    //private ByteArrayOutputStream JpegImage;




    public Cad(String mainCategory, String subCategory, String title, String index, String imageURL) {
=======
    private String s3Url;
    private LocalDateTime createdAt;


    public Cad(String author, String mainCategory, String subCategory, String title, String index, String s3Url) {
        this.author = author;
>>>>>>> master
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
        this.title = title;
        this.index = index;
<<<<<<< HEAD
        this.imageURL=imageURL;
=======
        this.s3Url = s3Url;
        this.createdAt = LocalDateTime.now();
>>>>>>> master
    }

    @Override
    public String toString() {
        return "Cad File[" +
                "\n\tid=" + id +
                "\n\tmainCategory=" + mainCategory +
                "\n\tsubCategory=" + subCategory +
                "\n\ttitle=" + title +
                "\n\tindex=" + index +
<<<<<<< HEAD
                "\n\timageURL=" + imageURL +
=======
                "\n\ts3Url=" + s3Url +
>>>>>>> master
                "]";
    }
}
