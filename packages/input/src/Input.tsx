import { ControlProps, useField } from "@chakra-ui/form-control"
import { createChakra, PropsOf, useComponentStyle } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import * as React from "react"
import { useInputGroup } from "./Input.group"

type OmittedTypes = "disabled" | "required" | "readOnly"

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean
}

export type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> &
  ControlProps

const StyledInput = createChakra<"input", InputOptions>("input", {
  themeKey: "Input",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

StyledInput.displayName = "StyledInput"

export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useField<HTMLInputElement>(props)
    const group = useInputGroup()

    const variant = group?.variant || props.variant
    const variantSize = group?.variantSize || props.variantSize

    const { height } = useComponentStyle({
      themeKey: "Input",
      variant,
      variantSize,
    })

    return (
      <StyledInput
        ref={ref}
        {...inputProps}
        variant={variant}
        variantSize={variantSize}
        {...(group?.hasRightElement && { paddingRight: height })}
        {...(group?.hasLeftElement && { paddingLeft: height })}
      />
    )
  },
)

Input.displayName = "Input"

Input.defaultProps = {
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}