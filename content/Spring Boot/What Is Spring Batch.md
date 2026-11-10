---
title: Spring Batch Framework
tags: [spring-boot, spring-batch, batch-processing]
difficulty: medium
date: 2026-11-09
---

## What Is Spring Batch?

Spring Batch is a framework used to develop **reliable, scalable, and fault-tolerant batch processing applications** in Java.

It is designed to process large volumes of data without requiring users or external systems to trigger each individual record manually.

Common use cases include:

- Processing payroll files.
- Generating monthly financial statements.
- Importing data from CSV files into a database.
- Processing nightly transactions.
- Migrating data between systems.
- Generating reports.

For example, in a retirement account servicing application, Spring Batch could process thousands of payroll contribution records every night and update participant accounts.

## 1. Key Components of Spring Batch

| Component       | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `Job`           | Represents the complete batch process                                         |
| `JobInstance`   | A logical job execution identified by the job name and identifying parameters |
| `JobExecution`  | A particular attempt to execute a job instance                                |
| `Step`          | A unit of work within a job                                                   |
| `ItemReader`    | Reads input records                                                           |
| `ItemProcessor` | Validates or transforms records                                               |
| `ItemWriter`    | Writes processed records                                                      |
| `JobRepository` | Stores job execution metadata, status, and restart information                |
| `JobLauncher`   | Starts a job execution                                                        |

## 2. How Does Spring Batch Work?

Spring Batch commonly uses **chunk-oriented processing**.

Instead of processing and committing one record at a time, it processes records in chunks.

### Chunk Processing Flow

1. The Job starts.
2. A Step begins.
3. `ItemReader` reads records.
4. `ItemProcessor` validates or transforms the records.
5. `ItemWriter` writes the processed records.
6. When the chunk reaches its configured size, the transaction commits.
7. The process repeats until all records are processed.
8. The Step and Job complete.

For example, if a job processes 10,000 records with a chunk size of 100:

- The reader reads records in sequence.
- The processor validates or transforms each record.
- The writer writes each group of 100 records.
- The transaction commits after each chunk.
- The process repeats for 100 chunks, assuming no records are filtered out.

This reduces transaction overhead and improves efficiency.

## 3. Brief Example

Suppose we need to process employee records from a CSV file and save them to a database.

### Employee Entity

    @Entity
    public class Employee {

        @Id
        private Long id;

        private String name;

        private BigDecimal salary;

        // Getters and setters
    }

### ItemReader

Reads employee records from a CSV file.

    @Bean
    public FlatFileItemReader<Employee> employeeReader() {

        return new FlatFileItemReaderBuilder<Employee>()
                .name("employeeReader")
                .resource(new ClassPathResource("employees.csv"))
                .delimited()
                .names("id", "name", "salary")
                .targetType(Employee.class)
                .build();
    }

### ItemProcessor

Validates or transforms each employee record.

    @Bean
    public ItemProcessor<Employee, Employee> employeeProcessor() {

        return employee -> {
            if (employee.getSalary()
                    .compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException(
                        "Salary must be positive");
            }

            return employee;
        };
    }

### ItemWriter

Writes the processed employees to the database.

    @Bean
    public JdbcBatchItemWriter<Employee> employeeWriter(
            DataSource dataSource) {

        return new JdbcBatchItemWriterBuilder<Employee>()
                .dataSource(dataSource)
                .sql("""
                    INSERT INTO employee (id, name, salary)
                    VALUES (:id, :name, :salary)
                    """)
                .beanMapped()
                .build();
    }

### Step and Job

    @Bean
    public Step employeeStep(
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            FlatFileItemReader<Employee> employeeReader,
            ItemProcessor<Employee, Employee> employeeProcessor,
            JdbcBatchItemWriter<Employee> employeeWriter) {

        return new StepBuilder("employeeStep", jobRepository)
                .<Employee, Employee>chunk(100, transactionManager)
                .reader(employeeReader)
                .processor(employeeProcessor)
                .writer(employeeWriter)
                .build();
    }

    @Bean
    public Job employeeJob(
            JobRepository jobRepository,
            Step employeeStep) {

        return new JobBuilder("employeeJob", jobRepository)
                .start(employeeStep)
                .build();
    }

This is a simplified configuration example. A production job would also define job parameters, error handling, and restart behavior.

## 4. Important Features of Spring Batch

### A. Restartability

If a job fails after processing some records, Spring Batch can restart it using persisted execution metadata.

For example, if 50,000 records are processed and the job fails, the framework can resume from a saved checkpoint rather than necessarily starting from the beginning.

### B. Transaction Management

Chunk processing allows records to be written and committed in batches.

If a chunk fails, its transaction can roll back.

### C. Skip and Retry

Spring Batch supports:

- **Skip:** Ignore selected records that cannot be processed.
- **Retry:** Attempt processing again for transient failures, such as temporary database errors.

### D. Scalability

Batch jobs can be scaled using approaches such as:

- Multi-threaded steps.
- Parallel flows.
- Partitioning.
- Remote chunking.

These approaches should be chosen carefully based on transaction boundaries and data consistency requirements.

## 5. Spring Batch vs Spring Scheduler

| Spring Batch                               | Spring Scheduler                                |
| ------------------------------------------ | ----------------------------------------------- |
| Processes large volumes of data            | Triggers tasks at scheduled times               |
| Provides job and step management           | Provides scheduling capabilities                |
| Supports restartability and checkpoints    | Does not provide batch restartability by itself |
| Supports chunk processing, skip, and retry | Primarily invokes a task                        |

They can work together.

For example, Spring Scheduler can trigger a Spring Batch job every night at 02:00.

## 6. How to Answer in an Interview

A concise answer:

"Spring Batch is a framework used for processing large volumes of data reliably. It provides features such as chunk-oriented processing, transaction management, restartability, skip and retry mechanisms, and job execution tracking.

A typical batch job consists of a Job containing one or more Steps. In a chunk-oriented step, an ItemReader reads records, an ItemProcessor transforms or validates them, and an ItemWriter writes them in chunks.

For example, in a financial application, I would use Spring Batch to process nightly contribution files. Each record could be validated, transformed, and posted to the appropriate participant account. The chunk-based transaction model helps maintain consistency, while the JobRepository tracks execution status and supports recovery."

**Note:** If you have not used Spring Batch in a production application, describe this as a design or practice-project example rather than claiming production experience.

## Follow-up Questions

**Q1.** What is the difference between a Job, JobInstance, and JobExecution?

**Q2.** How does Spring Batch handle job failure and restartability?

**Q3.** How would you design a Spring Batch job to process millions of financial transactions efficiently?
