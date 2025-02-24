package com.newtech.tech_str.web;

import com.newtech.tech_str.entity.Product;
import com.newtech.tech_str.service.ProductService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @GetMapping
    public Iterable<Product> getProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @PostMapping
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
    }

    @PutMapping("/{productId}/producer/{producerId}")
    public void assignProducer(@PathVariable Long productId, @PathVariable Long producerId){
        productService.assignProducerToProduct(productId,producerId);
    }

    @GetMapping("/location/{locationId}")
    public List<Product> getProductsByLocationId(@PathVariable Long locationId){
        return productService.getProductsByLocationId(locationId);
    }

    @GetMapping("/producer/{producerId}")
    public List<Product> getProductsByProducerId(@PathVariable Long producerId){
        return productService.getProductsByProducerId(producerId);
    }

}
