package com.example.testbackend.model.dto;

import com.example.testbackend.model.entity.Cart;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderDto {
    private Integer numOrder;
    private List<Cart> cartList;
}
