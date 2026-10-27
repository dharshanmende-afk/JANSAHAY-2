package com.jansaahay.repository;

import com.jansaahay.entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, String> {
    List<Scholarship> findByCategory(String category);
    List<Scholarship> findByStatus(String status);

    @Query("SELECT s FROM Scholarship s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.provider) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.category) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.tags) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Scholarship> searchScholarships(@Param("query") String query);

    long countByStatus(String status);
    long countByUnverifiedFlag(boolean flag);
}
