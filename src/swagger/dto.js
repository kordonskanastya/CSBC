// -----------Students-----------
/**
 * @swagger
 * components:
 *   schemas:
 *     StudentsRequestBody:
 *       type: object
 *       required:
 *         - edeboId
 *         - groupId
 *         - userId
 *       properties:
 *           edeboId:
 *           - type: integer
 *           - description: Unique student`s identifier
 *           groupId:
 *           - type: integer
 *           - description: id of student group
 *           userId:
 *           - type: integer
 *           - description:  id of user connected to student
 *       example:
 *         edeboId: 1234567
 *         groupId: 4
 *         userId: 4
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     StudentsResponseBody:
 *       type: object
 *       required:
 *         - id
 *         - edeboId
 *         - groupId
 *         - userId
 *       properties:
 *           id:
 *           -type:integer
 *           -description: Unique student identifier
 *           edeboId:
 *           - type: integer
 *           - description: Unique student`s identifier
 *           groupId:
 *           - type: integer
 *           - description: id of student group
 *           userId:
 *           - type: integer
 *           - description:  id of user connected to student
 *       example:
 *         id: 1
 *         edeboId: 1234567
 *         groupId: 4
 *         userId: 4
 */

// -----------Courses-----------
/**
 * @swagger
 * components:
 *   schemas:
 *     CoursesRequestBody:
 *       type: object
 *       required:
 *         - lecturerId
 *         - credits
 *         - name
 *       properties:
 *           lecturerId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           credits:
 *           - type: integer
 *           - description: Academic system of credits that a student receives for a course
 *           name:
 *           - type: string
 *           - description:  Course name
 *       example:
 *         lecturerId: 1
 *         credits: 10
 *         name: OOP
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CoursesResponseBody:
 *       type: object
 *       required:
 *         - id
 *         - lecturerId
 *         - credits
 *         - name
 *       properties:
 *           id:
 *           -type:integer
 *           -description: Unique course identifier
 *           lecturerId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           credits:
 *           - type: integer
 *           - description: Academic system of credits that a student receives for a course
 *           name:
 *           - type: string
 *           - description:  Course name
 *       example:
 *         id: 1
 *         lecturerId: 1
 *         credits: 10
 *         name: OOP
 */
// -------------Groups-----------
/**
 * @swagger
 * components:
 *   schemas:
 *     GroupsRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - curatorId
 *         - entryYear
 *         - graduationYear
 *         - fkSpecialityId
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Group name
 *           curatorId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           entryYear:
 *           - type: data
 *           - description: data of entry to university
 *           graduationYear:
 *           - type: data
 *           - description: data of graduation from university
 *           fkSpecialityId:
 *           - type: integer
 *           - description: Unique specialities identifier
 *       example:
 *         name: 1п-19
 *         curatorId: 2
 *         entryYear: 2020-07-10
 *         graduationYear: 2024-07-10
 *         fkSpecialityId: 10
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     GroupsResponseBody:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - curatorId
 *         - entryYear
 *         - graduationYear
 *         - fkSpecialityId
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Group name
 *           curatorId:
 *           - type: integer
 *           - description: Unique user`s identifier
 *           entryYear:
 *           - type: data
 *           - description: data of entry to university
 *           graduationYear:
 *           - type: data
 *           - description: data of graduation from university
 *           fkSpecialityId:
 *           - type: integer
 *           - description: Unique specialities identifier
 *       example:
 *         id: 1
 *         name: 1п-19
 *         curatorId: 2
 *         entryYear: 2020-07-10
 *         graduationYear: 2024-07-10
 *         fkSpecialityId: 10
 */
// -------------Specialities-----------
/**
 * @swagger
 * components:
 *   schemas:
 *     SpecialitiesRequestBody:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Speciality name
 *           code:
 *           - type: string
 *           - description: Speciality code
 *       example:
 *         name: Інженерія програмного забезпечення
 *         code: 121
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SpecialitiesResponseBody:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - code
 *       properties:
 *           name:
 *           - type: string
 *           - description:  Group name
 *           code:
 *           - type: string
 *           - description: Unique user`s identifier
 *       example:
 *         id: 1
 *         name: Інженерія програмного забезпечення
 *         code: 121
 */
// ------------Users-------------
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequestBody:
 *       type: object
 *       required:
 *         - username
 *         - surname
 *         - patronymic
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description:  User Name
 *         surname:
 *           type: string
 *           description:  User surname
 *         patronymic:
 *           type: string
 *           description:  User patronymic
 *         email:
 *           type: string
 *           description:  User email
 *         password:
 *           type: string
 *           description: User password
 *         role:
 *         type: string
 *         description: User role
 *       example:
 *         username: Vasya
 *         surname: Pup
 *         patronymic: Georgovich
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 *         role: admin
 */
// --------------Auth------------
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - surname
 *         - patronymic
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description:  User Name
 *         surname:
 *           type: string
 *           description:  User surname
 *         patronymic:
 *           type: string
 *           description:  User patronymic
 *         email:
 *           type: string
 *           description:  User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         id: default
 *         username: Vasya
 *         surname: Pup
 *         patronymic: Georgovich
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description:  User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         email: pupvasya@gmail.com
 *         password: VasyaKrutoy
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description:  accessToken
 *         refreshToken:
 *           type: string
 *           description: refreshToken
 *         message:
 *           type: string
 *           description: Message
 *       example:
 *         accessToken: sdgfkgfgfruiygfvbn
 *         refreshToken: fdhhfdhfdfd
 *         message: You are logged in
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description:  accessToken
 *         refreshToken:
 *           type: string
 *           description: refreshToken
 *         message:
 *           type: string
 *           description: Message
 *       example:
 *         accessToken: sdgfkgfgfruiygfvbn
 *         refreshToken: fdhhfdhfdfd
 *         message: You are logged in
 */
