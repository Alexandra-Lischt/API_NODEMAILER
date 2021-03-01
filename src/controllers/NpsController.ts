import { getCustomRepository, Not, IsNull } from 'typeorm';
import { Request, Response } from "express";
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NpsController {
  async execute(request: Request, response: Response){
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractors = surveysUsers.filter((survey) =>  survey.value >= 0 && survey.value <= 6 ).length;
    const promoters = surveysUsers.filter((surveys) => surveys.value >= 9 && surveys.value <= 10).length;
    const passives = surveysUsers.filter((surveys) => surveys.value >= 7 && surveys.value <= 8).length;
    
    const totalAnswers = surveysUsers.length;

    const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

    return response.send({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calculate
    })
  }
}

export { NpsController };