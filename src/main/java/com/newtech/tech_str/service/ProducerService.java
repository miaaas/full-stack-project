package com.newtech.tech_str.service;

import com.newtech.tech_str.entity.Producer;
import com.newtech.tech_str.repository.ProducerRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {
    
    @Autowired
    private ProducerRepository producerRepository;

    public Iterable<Producer> getAllProducers(){
        return producerRepository.findAll();
    }

    public Producer getProducerById(Long id){
        return producerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Producer not found with id: " + id));
    }

    public Producer saveProducer(Producer producer){
        return producerRepository.save(producer);
    }

    public void deleteProducer(Long id){
        if (!producerRepository.existsById(id)) {
            throw new EntityNotFoundException("Producer not found with id: " + id);
        }
        producerRepository.deleteById(id);
    }

    public Producer updateProducer( Long id, Producer producer){
        if (!producerRepository.existsById(id)) {
            throw new EntityNotFoundException("Producer not found with id: " + id);
        }
        producer.setId(id);
        return producerRepository.save(producer);
    }

    public List<Producer> getProducerByProductId(Long productId){
        return producerRepository.findProducerByProductId(productId);
    }

    

}
