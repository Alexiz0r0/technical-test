package com.example.testbackend.model.dao;

import com.example.testbackend.model.entity.Order;
import org.springframework.data.repository.CrudRepository;


public interface OrderDao extends CrudRepository<Order, Long> {
}
