import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}
  create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: user._id,
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(id: string) {
    return this.reservationRepository.findOne({ id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(
      { id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationRepository.findOneAndDelete({ id });
  }
}
