import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = surveyRepository.create({
      title, description
    })

    await surveyRepository.save(survey);

    return response.status(201).send(survey)
  }

  async show(request: Request, response: Response){

    const surveyRepository = getCustomRepository(SurveyRepository);

    const allSurveys = await surveyRepository.find();

    return response.status(200).send(allSurveys)
  }

  // async update(request: Request, response: Response){
  //   const { id, title, description } = request.body;

  //   const surveyRepository = getCustomRepository(SurveyRepository);

  //   const surveyUpdated = surveyRepository.update({ id }, {
  //     title,
  //     description
  //   })

  //   await surveyRepository.save(surveyUpdated);

  //   return response.status(200).send({ surveyUpdated })

  // }

  async delete(request: Request, response: Response){
    const { id } = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const findSurveyById = await surveyRepository.findOne({ id })

    if(!findSurveyById) {
      throw new AppError("Survey not found!");
    }

    await surveyRepository.delete({ id })

    return response.status(200).send({ message: "Survey deleted successfully!"})
  }
}

export { SurveyController };
