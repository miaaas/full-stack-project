package com.sub.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.cloud.spring.pubsub.core.subscriber.PubSubSubscriberTemplate;

import jakarta.annotation.PostConstruct;

@Service
public class SubscriberService {

    @Autowired
    private final PubSubSubscriberTemplate pubSubSubscriberTemplate;

    public SubscriberService(PubSubSubscriberTemplate pubSubSubscriberTemplate) {
        this.pubSubSubscriberTemplate = pubSubSubscriberTemplate;
    }

    @PostConstruct
    public void subscribe() {
        pubSubSubscriberTemplate.subscribe("MySub", (message) -> {
            String payload = message.getPubsubMessage().getData().toStringUtf8();
            System.out.println("Message: " + payload);
            message.ack(); 
        });
    }

}
