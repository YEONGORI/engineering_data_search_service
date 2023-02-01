package com.sanhak.edss.s3;

import com.amazonaws.services.s3.AmazonS3Client;
<<<<<<< HEAD
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
=======
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.transfer.MultipleFileDownload;
>>>>>>> master
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferProgress;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
=======
import java.io.*;
>>>>>>> master
import java.net.URLDecoder;
import java.text.DecimalFormat;

@Transactional(readOnly = true)
@PropertySource(value = "application.properties")
@RequiredArgsConstructor
@Component
public class S3Utils {
    private final TransferManager transferManager;
    private final AmazonS3Client amazonS3Client;
<<<<<<< HEAD

=======
>>>>>>> master
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
<<<<<<< HEAD
    public String putS3(String filePath, InputStream stream){
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(MediaType.IMAGE_JPEG_VALUE);
        amazonS3Client.putObject(new PutObjectRequest(bucket,filePath,stream, metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket,filePath).toString();
    }

    private void removeNewFile(File fileName){
        fileName.delete();
    }

}
=======
    public String putS3(String filePath, String fileName, ByteArrayOutputStream bos)throws IOException{

        byte[] data;
        if(bos == null){
            return "https://dwg-upload.s3.ap-northeast-2.amazonaws.com/image/images.jpeg";
        }
        else{
            data = bos.toByteArray();
        }
        ByteArrayInputStream bin = new ByteArrayInputStream(data);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(MediaType.IMAGE_JPEG_VALUE);
        metadata.setContentLength(data.length);

        String S3_fileName = fileName.substring(0,fileName.length()-4) + ".jpeg";

        amazonS3Client.putObject(bucket,filePath+S3_fileName,bin, metadata);
        String PathUrl = amazonS3Client.getUrl(bucket,filePath).toString();
        bin.close();
        return PathUrl+S3_fileName;
    }
}
>>>>>>> master
