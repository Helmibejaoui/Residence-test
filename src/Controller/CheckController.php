<?php

namespace App\Controller;

use App\Service\CheckService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CheckController extends AbstractController
{
    #[Route('/api/checks', name: 'api_check_list')]
    public function __invoke(CheckService $checkService): JsonResponse
    {
        $result = $checkService->getData();
        return new JsonResponse($result, 200);
    }
}
