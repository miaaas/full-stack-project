package com.newtech.tech_str.service;


import com.newtech.tech_str.entity.Location;
import com.newtech.tech_str.entity.Product;
import com.newtech.tech_str.repository.LocationRepository;
import com.newtech.tech_str.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Location> getAllLocations(){
        return locationRepository.findAll();
    }

    public Location getLocationById(Long id){
        return locationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Location not found with id: " + id));
    }

    public Location saveLocation(Location location){
        return locationRepository.save(location);
    }

    public void deleteLocation(Long id){
        if (!locationRepository.existsById(id)) {
            throw new EntityNotFoundException("Location not found with id: " + id);
        }
        locationRepository.deleteById(id);
    }

    public Location updateLocation( Long id, Location location){
        if (!locationRepository.existsById(id)) {
            throw new EntityNotFoundException("Location not found with id: " + id);
        }
        location.setId(id);
        return locationRepository.save(location);
    }

    public List<Location> getLocationsByProductId(Long productId){
        return locationRepository.findLocationsByProductId(productId);
    }


    public void assigntProductToLocation(Long productId, Long locationId){
        Product product = productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Location location = locationRepository.findById(locationId).orElseThrow(() -> new EntityNotFoundException("Location not found"));
    
        location.setProduct(product);	
        locationRepository.save(location);
    }
    

}
