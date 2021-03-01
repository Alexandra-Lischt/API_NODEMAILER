import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUsersRepository.findOne({ id: String(u) })

    if(!surveyUser){
      return response.status(400).send({ error: "Survey User doesn't exist!"})
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);

    return response.status(200).send(surveyUser);
  }
}

export { AnswerController };