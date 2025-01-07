import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(() => [StudentType])
  getAllStudent(): Promise<Student[]> {
    return this.studentService.getAllStudent();
  }
  @Query(() => StudentType)
  getStudentById(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
