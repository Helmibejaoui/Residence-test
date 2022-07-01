<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    itemOperations: ['get' => ['normalization_context' => ['groups' => 'get']],
        'put',
        'patch',
        'delete'],
    attributes: ['pagination_enabled' => false],
    normalizationContext: ['groups' => ['reservation']])]
#[ApiFilter(SearchFilter::class, properties: ["startAt" => "exact", "status" => "exact"])]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource", "get"])]
    protected ?int $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $status;

    #[ORM\Column(type: 'integer')]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $cin;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $lastname;

    #[ORM\Column(type: 'float')]
    #[Groups(["reservation", "ressource", "get"])]
    private ?float $payment;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $type;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(["reservation", "ressource", "get"])]
    private ?string $advance;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["reservation", "ressource", "get"])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private ?\DateTimeInterface $dateAdvance;

    #[ORM\Column(type: 'date')]
    #[Groups(["reservation", "ressource", "get"])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private ?\DateTimeInterface $startAt;

    #[ORM\Column(type: 'date')]
    #[Groups(["reservation", "ressource", "get"])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private ?\DateTimeInterface $endAt;

    #[ORM\ManyToOne(targetEntity: Ressource::class, inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["reservation", "get"])]
    #[ApiSubresource]
    private ?Ressource $ressource;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCin(): ?int
    {
        return $this->cin;
    }

    public function setCin(int $cin): self
    {
        $this->cin = $cin;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPayment(): ?float
    {
        return $this->payment;
    }

    public function setPayment(float $payment): self
    {
        $this->payment = $payment;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getAdvance(): ?float
    {
        return $this->advance;
    }

    public function setAdvance(?float $advance): self
    {
        $this->advance = $advance;

        return $this;
    }

    public function getDateAdvance(): ?\DateTimeInterface
    {
        return $this->dateAdvance;
    }

    public function setDateAdvance(?\DateTimeInterface $dateAdvance): self
    {
        $this->dateAdvance = $dateAdvance;

        return $this;
    }

    public function getStartAt(): ?\DateTimeInterface
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeInterface $startAt): self
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeInterface
    {
        return $this->endAt;
    }

    public function setEndAt(\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getRessource(): ?Ressource
    {
        return $this->ressource;
    }

    public function setRessource(?Ressource $ressource): self
    {
        $this->ressource = $ressource;

        return $this;
    }
}
