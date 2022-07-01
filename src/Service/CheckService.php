<?php

namespace App\Service;

use App\Repository\ReservationRepository;

class CheckService
{
    public function __construct(public ReservationRepository $repository)
    {
    }

    public function getData(): string
    {
        $result = $this->repository->findByDate(date('Y-m-d'));
        return $result ? $result[0]['sum'] : '0';

    }

}