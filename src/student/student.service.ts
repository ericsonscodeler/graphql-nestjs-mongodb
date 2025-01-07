import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getAllStudent(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getManyStudents(studentsIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: In(studentsIds),
      },
    });
  }
  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
    });
  }
}
