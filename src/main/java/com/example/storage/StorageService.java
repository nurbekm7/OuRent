package com.example.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class StorageService {

	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	public String store(MultipartFile file, String path, String filename) {
		try {
			log.debug(file.getInputStream().toString());
			init(Paths.get(path));
			Files.copy(file.getInputStream(), Paths.get(path).resolve(filename));
			return Paths.get(path).resolve(filename).toString();
		} catch (Exception e) {
			log.debug(e.toString());
			throw new RuntimeException("FAIL!");
		}
	}

	//	public Resource loadFile(String filename) {
//		try {
//			Path file = rootLocation.resolve(filename);
//			Resource resource = new UrlResource(file.toUri());
//			if (resource.exists() || resource.isReadable()) {
//				return resource;
//			} else {
//				throw new RuntimeException("FAIL!");
//			}
//		} catch (MalformedURLException e) {
//			throw new RuntimeException("FAIL!");
//		}
//	}
//
	public void deleteImg(String path) {
        Path rootLocation = Paths.get(path);
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
//
	public void init(Path rootLocation) {
		try {
			Files.createDirectories(rootLocation);
		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}


}
