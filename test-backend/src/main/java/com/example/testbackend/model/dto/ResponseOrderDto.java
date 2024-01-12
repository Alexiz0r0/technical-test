package com.example.testbackend.model.dto;

import com.example.testbackend.model.entity.Cart;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResponseOrderDto {
    private Integer numOrder;
    private Long orderId;
    private List<Cart> cartList;
    private LocalDate date;
    private float finalPrice;
}
