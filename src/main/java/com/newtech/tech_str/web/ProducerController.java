package com.newtech.tech_str.web;


import com.newtech.tech_str.entity.Producer;
import com.newtech.tech_str.service.ProducerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/producers")
@CrossOrigin(origins = "http://localhost:3000")
public class ProducerController {
    @Autowired
    private ProducerService producerService;
    
    @GetMapping
    public Iterable<Producer> getProducers(){
        return producerService.getAllProducers();
    }

    @GetMapping("/{id}")
    public Producer getProducerById(@PathVariable Long id){
        return producerService.getProducerById(id);
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json;charset=UTF-8"})
    public Producer saveProducer(@RequestBody Producer producer) {
        return producerService.saveProducer(producer);
    }

    @DeleteMapping("/{id}")
    public void deleteProducer(@PathVariable Long id){
        producerService.deleteProducer(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producer> updateProducer(@PathVariable Long id, @RequestBody Producer producer) {
        Producer updatedProducer = producerService.updateProducer(id, producer);
        return new ResponseEntity<>(updatedProducer,HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public List<Producer> getProducerByProductId(@PathVariable Long productId){
        return producerService.getProducerByProductId(productId);
    }
    
}
