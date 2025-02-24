package com.newtech.tech_str.web;

import com.newtech.tech_str.entity.Location;
import com.newtech.tech_str.service.LocationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;



@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {
    @Autowired
    private LocationService locationService;
    
    @Operation(summary = "Get all locations", description = "Retrieve a list of all store locations")
    @GetMapping
    public Iterable<Location> getLocations(){
        return locationService.getAllLocations();
    }

    @Operation(summary = "Get one location", description = "Retrieve locations by its ID")
    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable Long id){
        return locationService.getLocationById(id);
    }

    @Operation(summary = "Create a location", description = "Creates a new locations")
    @PostMapping
    public Location saveLocation(@RequestBody Location location){
        System.out.println("Received Location: " + location);
        return locationService.saveLocation(location);
    }

    @Operation(summary = "Delete a location", description = "Deletes the location by its ID")
    @DeleteMapping(value = "/{id}")
    public void deleteLocation(@PathVariable("id") Long id){
        locationService.deleteLocation(id);
    }

    @Operation(summary = "Update a location", description = "Updates the name/address of the location that was retireved by its ID")
    @PutMapping("/update/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location location) {
        Location updatedLocation = locationService.updateLocation(id, location);
        return new ResponseEntity<>(updatedLocation,HttpStatus.OK);
    }

    @Operation(summary = "Get location by product ID", description = "Retrieves a list of locations that have product with specific ID")
    @GetMapping("/product/{productId}")
    public List<Location> getLocationsByProductId(@PathVariable Long productId){
        return locationService.getLocationsByProductId(productId);
    }

    @Operation(summary = "Assign product to location", description = "Assigns product using its ID to a location using the locations ID")
    @PutMapping("/{locationId}/product/{productId}")
    public void assignProduct(@PathVariable Long productId, @PathVariable Long locationId){
        locationService.assigntProductToLocation(productId, locationId);
    }
    
    
}
