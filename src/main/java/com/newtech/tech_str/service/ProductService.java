package com.newtech.tech_str.service;

import com.newtech.tech_str.entity.Producer;
import com.newtech.tech_str.entity.Product;
import com.newtech.tech_str.repository.ProducerRepository;
import com.newtech.tech_str.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProducerRepository producerRepository;

    public Iterable<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public Product updateProduct( Long id, Product product){
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        product.setId(id);
        return productRepository.save(product);
    }


    public void assignProducerToProduct(Long productId, Long producerId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));
        Producer producer = producerRepository.findById(producerId).orElseThrow(() -> new EntityNotFoundException("Producer not found with id: " + producerId));
        
        product.setProducer(producer);
        productRepository.save(product);
    }
    
    public List<Product> getProductsByLocationId(Long locationId){
        return productRepository.findProductsByLocationId(locationId);
    }

    public List<Product> getProductsByProducerId(Long producerId) {
        return productRepository.findProductsByProducerId(producerId);
    }
    
}
