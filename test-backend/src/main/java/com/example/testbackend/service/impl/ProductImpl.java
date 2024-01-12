package com.example.testbackend.service.impl;

import com.example.testbackend.model.dao.ProductDao;
import com.example.testbackend.model.entity.Product;
import com.example.testbackend.service.IProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImpl implements IProduct {

    private final ProductDao productDao;

    @Override
    public List<Product> listAll() {
        return (List<Product>) productDao.findAll();
    }

    @Override
    public Product save(Product product) {
        return productDao.save(product);
    }

    @Override
    public Product findById(Long id) {
        return productDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Product product) {
        productDao.delete(product);
    }
}
