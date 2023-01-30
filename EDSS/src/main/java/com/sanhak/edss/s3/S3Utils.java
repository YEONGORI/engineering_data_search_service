package com.sanhak.edss.s3;

import co.elastic.clients.elasticsearch.watcher.Input;
import com.amazonaws.services.cloudformation.model.Output;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.MultipleFileDownload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferProgress;
import com.sanhak.edss.aspose.AsposeUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.DecimalFormat;

@Transactional(readOnly = true)
@PropertySource(value = "application.properties")
@RequiredArgsConstructor
@Component
public class S3Utils {
    private final TransferManager transferManager;
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    public void downloadFolder(String dir) throws IOException, InterruptedException {
        try {
            File localDirectory = new File("s3-download");
            String tmp = URLDecoder.decode(dir,"utf-8");
            MultipleFileDownload downloadDirectory = transferManager.downloadDirectory(bucket, tmp, localDirectory);

            System.out.println("[ test ] download progressing... start");
            DecimalFormat decimalFormat = new DecimalFormat("##0.00");
            while(!downloadDirectory.isDone()){
                Thread.sleep(1000);
                TransferProgress progress = downloadDirectory.getProgress();
                double percentTransferred = progress.getPercentTransferred();
                System.out.println("[ test ]" + decimalFormat.format(percentTransferred)+"% download progressing...");

            }
            System.out.println("[ test ] download directory from S3 succecss!");
        }
        catch (IOException e) {
            System.out.println("ERR");
            e.getMessage();
        }
    }
    public String putS3(String filePath, String fileName, ByteArrayOutputStream bos)throws IOException{
        System.out.println("PutS3");

        byte[] data;
        if(bos == null){
            return null;
        }
        else{
            data = bos.toByteArray();
        }
        ByteArrayInputStream bin = new ByteArrayInputStream(data);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(MediaType.IMAGE_JPEG_VALUE);
        metadata.setContentLength(data.length);


        //String encode_fileName = URLEncoder.encode(fileName,"UTF-8");
        String S3_fileName = fileName.substring(0,fileName.length()-4) + ".jpeg";

        amazonS3Client.putObject(bucket,filePath+S3_fileName,bin, metadata);
        String PathUrl = amazonS3Client.getUrl(bucket,filePath).toString();
        bin.close();
        System.out.println(PathUrl + S3_fileName);
        return PathUrl+S3_fileName;
    }
}