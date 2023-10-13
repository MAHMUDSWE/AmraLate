package com.amralate.practice.respository;

import com.amralate.practice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
